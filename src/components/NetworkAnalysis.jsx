import { useEffect, useRef } from 'react';
import ThreeGlobe from 'three-globe';
import { WebGLRenderer, Scene, PerspectiveCamera, DirectionalLight, AmbientLight } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

function NetworkAnalysis({ routes, nodes }) {
  const containerRef = useRef();
  const globeRef = useRef();

  useEffect(() => {
    // Initialize globe
    const Globe = new ThreeGlobe()
      .globeImageUrl('//unpkg.com/three-globe/example/img/earth-dark.jpg')
      .arcsData(routes)
      .arcColor(() => '#ffffff')
      .arcAltitude(0.2)
      .arcStroke(0.5)
      .arcDashLength(0.9)
      .arcDashGap(4)
      .arcDashAnimateTime(1000)
      .pointsData(nodes)
      .pointColor(() => '#ffffff')
      .pointAltitude(0.01)
      .pointRadius(0.5);

    // Setup renderer
    const renderer = new WebGLRenderer();
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    containerRef.current.appendChild(renderer.domElement);

    // Setup scene
    const scene = new Scene();
    scene.add(Globe);
    scene.add(new AmbientLight(0xbbbbbb));
    scene.add(new DirectionalLight(0xffffff, 0.6));

    // Setup camera
    const camera = new PerspectiveCamera(75, containerRef.current.clientWidth / containerRef.current.clientHeight);
    camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
    camera.updateProjectionMatrix();
    camera.position.z = 180;

    // Add controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.enablePan = false;

    // Animation loop
    function animate() {
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    }
    animate();

    // Handle resize
    function onWindowResize() {
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    }
    window.addEventListener('resize', onWindowResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', onWindowResize);
      containerRef.current.removeChild(renderer.domElement);
    };
  }, [routes, nodes]);

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h3 className="text-lg font-medium text-gray-900 mb-4">Network Analysis</h3>
      <div ref={containerRef} style={{ height: '400px' }} className="rounded-lg overflow-hidden"></div>
      
      <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Network Density</h4>
          <p className="text-2xl font-bold text-blue-600">78%</p>
          <p className="text-sm text-gray-500 mt-1">Connectivity measure between nodes</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Average Path Length</h4>
          <p className="text-2xl font-bold text-blue-600">3.2</p>
          <p className="text-sm text-gray-500 mt-1">Hops between any two nodes</p>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-700 mb-2">Clustering Coefficient</h4>
          <p className="text-2xl font-bold text-blue-600">0.65</p>
          <p className="text-sm text-gray-500 mt-1">Node interconnectivity measure</p>
        </div>
      </div>
    </div>
  );
}

export default NetworkAnalysis;