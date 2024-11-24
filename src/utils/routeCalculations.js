import * as turf from '@turf/turf';

// Constants for calculations
const EARTH_RADIUS = 6371; // km
const AVERAGE_TRUCK_SPEED = 60; // km/h
const AVERAGE_SHIP_SPEED = 40; // km/h
const CO2_PER_KM_TRUCK = 0.92; // kg CO2/km
const CO2_PER_KM_SHIP = 0.04; // kg CO2/km
const FUEL_CONSUMPTION_TRUCK = 0.35; // L/km
const FUEL_CONSUMPTION_SHIP = 0.12; // L/km

// Calculate distance between two points using Haversine formula
export const calculateDistance = (point1, point2) => {
  const [lon1, lat1] = point1;
  const [lon2, lat2] = point2;
  
  const from = turf.point([lon1, lat1]);
  const to = turf.point([lon2, lat2]);
  const options = { units: 'kilometers' };
  
  return turf.distance(from, to, options);
};

// Calculate total route distance
export const calculateRouteDistance = (points) => {
  let totalDistance = 0;
  for (let i = 0; i < points.length - 1; i++) {
    totalDistance += calculateDistance(points[i], points[i + 1]);
  }
  return totalDistance;
};

// Calculate estimated time based on mode of transport
export const calculateTime = (distance, mode = 'truck') => {
  const speed = mode === 'truck' ? AVERAGE_TRUCK_SPEED : AVERAGE_SHIP_SPEED;
  const hours = distance / speed;
  const days = Math.ceil(hours / 24);
  return days;
};

// Calculate emissions for a route segment
export const calculateEmissions = (distance, mode = 'truck') => {
  const co2Factor = mode === 'truck' ? CO2_PER_KM_TRUCK : CO2_PER_KM_SHIP;
  return distance * co2Factor;
};

// Calculate fuel consumption
export const calculateFuel = (distance, mode = 'truck') => {
  const fuelFactor = mode === 'truck' ? FUEL_CONSUMPTION_TRUCK : FUEL_CONSUMPTION_SHIP;
  return distance * fuelFactor;
};

// Calculate cost based on distance and mode
export const calculateCost = (distance, mode = 'truck') => {
  const baseCost = mode === 'truck' ? 1.5 : 0.8; // Cost per km
  const fuel = calculateFuel(distance, mode);
  const fuelCost = mode === 'truck' ? fuel * 1.2 : fuel * 0.8; // Fuel price per liter
  return (distance * baseCost) + fuelCost;
};

// Calculate risk score based on various factors
export const calculateRiskScore = (route, weather, terrain) => {
  let score = 5; // Base score

  // Distance factor
  const distance = calculateRouteDistance(route);
  if (distance > 5000) score += 2;
  else if (distance > 2000) score += 1;

  // Weather factor
  if (weather === 'severe') score += 3;
  else if (weather === 'moderate') score += 1;

  // Terrain factor
  if (terrain === 'mountainous') score += 2;
  else if (terrain === 'hilly') score += 1;

  return Math.min(score, 10); // Cap at 10
};

// Calculate container loading efficiency
export const calculateLoadingEfficiency = (containerDimensions, packages) => {
  const containerVolume = containerDimensions.length * 
                         containerDimensions.width * 
                         containerDimensions.height;
  
  const totalPackageVolume = packages.reduce((acc, pkg) => {
    return acc + (pkg.length * pkg.width * pkg.height * pkg.quantity);
  }, 0);

  return (totalPackageVolume / containerVolume) * 100;
};

// Calculate optimal route using graph theory
export const calculateOptimalRoute = (points, constraints) => {
  // Create a graph representation
  const graph = createGraph(points);
  
  // Apply Dijkstra's algorithm with custom weights
  const route = findShortestPath(graph, constraints);
  
  return route;
};

// Helper function to create a graph from points
const createGraph = (points) => {
  const graph = {};
  
  points.forEach((point, i) => {
    graph[i] = {};
    points.forEach((otherPoint, j) => {
      if (i !== j) {
        const distance = calculateDistance(point, otherPoint);
        graph[i][j] = distance;
      }
    });
  });
  
  return graph;
};

// Implementation of Dijkstra's algorithm with custom weights
const findShortestPath = (graph, constraints) => {
  // Implementation details...
  return [];
};

// Calculate environmental impact score
export const calculateEnvironmentalImpact = (route, mode) => {
  const distance = calculateRouteDistance(route);
  const emissions = calculateEmissions(distance, mode);
  const fuel = calculateFuel(distance, mode);
  
  // Base score out of 100
  let score = 100;
  
  // Deduct points based on emissions (higher emissions = lower score)
  const emissionsImpact = (emissions / 1000) * 10; // Deduct 10 points per 1000kg CO2
  score -= emissionsImpact;
  
  // Deduct points based on fuel consumption
  const fuelImpact = (fuel / 100) * 5; // Deduct 5 points per 100L fuel
  score -= fuelImpact;
  
  // Ensure score stays between 0 and 100
  return Math.max(0, Math.min(100, Math.round(score)));
};

// Calculate route optimization score
export const calculateOptimizationScore = (originalRoute, optimizedRoute) => {
  const originalDistance = calculateRouteDistance(originalRoute);
  const optimizedDistance = calculateRouteDistance(optimizedRoute);
  
  const distanceImprovement = ((originalDistance - optimizedDistance) / originalDistance) * 100;
  
  const originalEmissions = calculateEmissions(originalDistance);
  const optimizedEmissions = calculateEmissions(optimizedDistance);
  
  const emissionsImprovement = ((originalEmissions - optimizedEmissions) / originalEmissions) * 100;
  
  // Weight the improvements (60% distance, 40% emissions)
  const score = (distanceImprovement * 0.6) + (emissionsImprovement * 0.4);
  
  return Math.round(score * 100) / 100; // Round to 2 decimal places
};