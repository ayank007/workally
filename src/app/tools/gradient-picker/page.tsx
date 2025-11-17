"use client";
import { useState, useRef, useEffect } from 'react';

interface ColorStop {
  id: string;
  color: string;
  position: number;
}

interface MeshPoint {
  id: string;
  x: number;
  y: number;
  z: number;
  color: string;
}

type GradientType = 'linear' | 'radial' | 'mesh';

const GradientMaker = () => {
  const [gradientType, setGradientType] = useState<GradientType>('linear');
  const [angle, setAngle] = useState(90);
  const [colorStops, setColorStops] = useState<ColorStop[]>([
    { id: '1', color: '#020024', position: 0 },
    { id: '2', color: '#070661', position: 36 },
    { id: '3', color: '#090979', position: 58 },
    { id: '4', color: '#00d4ff', position: 100 }
  ]);
  const [meshPoints, setMeshPoints] = useState<MeshPoint[]>([
    { id: '1', x: 10, y: 10, z: 5, color: '#ff6b9d' },
    { id: '2', x: 90, y: 10, z: 3, color: '#4facfe' },
    { id: '3', x: 10, y: 90, z: 4, color: '#ffa726' },
    { id: '4', x: 50, y: 50, z: 10, color: '#f06595' },
    { id: '5', x: 90, y: 90, z: 2, color: '#c084fc' }
  ]);
  const [selectedStop, setSelectedStop] = useState('3');
  const [selectedMeshPoint, setSelectedMeshPoint] = useState('4');
  const [dragging, setDragging] = useState<string | null>(null);
  const [draggingMesh, setDraggingMesh] = useState<string | null>(null);
  const [dragOverIndex, setDragOverIndex] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const sliderRef = useRef<HTMLDivElement>(null);
  const meshRef = useRef<HTMLDivElement>(null);

  const generateGradientCSS = () => {
    const sortedStops = [...colorStops].sort((a, b) => a.position - b.position);
    const stopsString = sortedStops.map(stop => `${stop.color} ${stop.position}%`).join(', ');

    if (gradientType === 'linear') {
      return `linear-gradient(${angle}deg, ${stopsString})`;
    } else if (gradientType === 'radial') {
      return `radial-gradient(circle, ${stopsString})`;
    } else {
      const sortedByZ = [...meshPoints].sort((a, b) => a.z - b.z);
      const gradients = sortedByZ.map(point => `radial-gradient(circle at ${point.x}% ${point.y}%, ${point.color} 0%, transparent 50%)`);
      return gradients.join(', ');
    }
  };

  const handleSliderMouseDown = (stopId: string, e: React.MouseEvent) => {
    e.preventDefault();
    setDragging(stopId);
    setSelectedStop(stopId);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!dragging || !sliderRef.current) return;
    const rect = sliderRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setColorStops(stops => stops.map(stop => stop.id === dragging ? { ...stop, position: Math.round(percentage) } : stop));
  };

  const handleMouseUp = () => {
    setDragging(null);
  };

  const handleMeshMouseDown = (pointId: string, e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDraggingMesh(pointId);
    setSelectedMeshPoint(pointId);
  };

  const handleMeshMouseMove = (e: MouseEvent) => {
    if (!draggingMesh || !meshRef.current) return;
    const rect = meshRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const percentX = Math.max(0, Math.min(100, (x / rect.width) * 100));
    const percentY = Math.max(0, Math.min(100, (y / rect.height) * 100));
    setMeshPoints(points => points.map(point => point.id === draggingMesh ? { ...point, x: Math.round(percentX), y: Math.round(percentY) } : point));
  };

  const handleMeshMouseUp = () => {
    setDraggingMesh(null);
  };

  useEffect(() => {
    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [dragging]);

  useEffect(() => {
    if (draggingMesh) {
      document.addEventListener('mousemove', handleMeshMouseMove);
      document.addEventListener('mouseup', handleMeshMouseUp);
      return () => {
        document.removeEventListener('mousemove', handleMeshMouseMove);
        document.removeEventListener('mouseup', handleMeshMouseUp);
      };
    }
  }, [draggingMesh]);

  const addColorStop = () => {
    const newStop: ColorStop = { id: Date.now().toString(), color: '#ff0000', position: 50 };
    setColorStops([...colorStops, newStop]);
    setSelectedStop(newStop.id);
  };

  const deleteColorStop = (stopId: string) => {
    if (colorStops.length <= 2) return;
    const newStops = colorStops.filter(stop => stop.id !== stopId);
    setColorStops(newStops);
    if (selectedStop === stopId) setSelectedStop(newStops[0].id);
  };

  const addMeshPoint = () => {
    const newPoint: MeshPoint = { id: Date.now().toString(), x: 50, y: 50, z: 5, color: '#ff0000' };
    setMeshPoints([...meshPoints, newPoint]);
    setSelectedMeshPoint(newPoint.id);
  };

  const deleteMeshPoint = (pointId: string) => {
    if (meshPoints.length <= 2) return;
    const newPoints = meshPoints.filter(point => point.id !== pointId);
    setMeshPoints(newPoints);
    if (selectedMeshPoint === pointId) setSelectedMeshPoint(newPoints[0].id);
  };

  const updateColor = (stopId: string, color: string) => {
    setColorStops(stops => stops.map(stop => stop.id === stopId ? { ...stop, color } : stop));
  };

  const updatePosition = (stopId: string, position: number) => {
    setColorStops(stops => stops.map(stop => stop.id === stopId ? { ...stop, position: Math.max(0, Math.min(100, position)) } : stop));
  };

  const updateMeshColor = (pointId: string, color: string) => {
    setMeshPoints(points => points.map(point => point.id === pointId ? { ...point, color } : point));
  };

  const updateMeshPosition = (pointId: string, x: number, y: number) => {
    setMeshPoints(points => points.map(point => point.id === pointId ? { ...point, x: Math.max(0, Math.min(100, x)), y: Math.max(0, Math.min(100, y)) } : point));
  };

  const updateMeshZ = (pointId: string, z: number) => {
    setMeshPoints(points => points.map(point => point.id === pointId ? { ...point, z: Math.max(1, Math.min(10, z)) } : point));
  };

  const randomizeMesh = () => {
    const randomColor = () => '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
    const newPoints = meshPoints.map(point => ({
      ...point,
      x: Math.floor(Math.random() * 100),
      y: Math.floor(Math.random() * 100),
      z: Math.floor(Math.random() * 10) + 1,
      color: randomColor()
    }));
    setMeshPoints(newPoints);
  };

  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? { r: parseInt(result[1], 16), g: parseInt(result[2], 16), b: parseInt(result[3], 16) } : { r: 0, g: 0, b: 0 };
  };

  const copyToClipboard = () => {
    const css = `background: ${generateGradientCSS()};`;
    navigator.clipboard.writeText(css);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const selectedStopData = colorStops.find(s => s.id === selectedStop);
  const selectedMeshData = meshPoints.find(p => p.id === selectedMeshPoint);
  const currentColor = gradientType === 'mesh' ? (selectedMeshData?.color || '#000000') : (selectedStopData?.color || '#000000');
  const rgb = hexToRgb(currentColor);

  return (
    <div className='w-full pt-4 px-4'>
      <h1>Gradient Studio</h1>
      <p className='mt-2'>Craft stunning CSS gradients with ease</p>
      <div className="card mt-7 mb-6 w-full">
        {gradientType === 'mesh' ? (
          <div ref={meshRef} className="w-full h-52 rounded-2xl relative cursor-crosshair" style={{ background: generateGradientCSS() }}>
            {meshPoints.map((point) => (
              <div key={point.id} className="absolute cursor-move transition-transform hover:scale-125" style={{ left: `${point.x}%`, top: `${point.y}%`, transform: 'translate(-50%, -50%)' }} onMouseDown={(e) => handleMeshMouseDown(point.id, e)}>
                <div className={`w-8 h-8 rounded-full shadow-2xl transition-all ${selectedMeshPoint === point.id ? 'border-4 border-white ring-4 ring-purple-400 scale-125' : 'border-3 border-white/70'}`} style={{ backgroundColor: point.color }} />
              </div>
            ))}
          </div>
        ) : (
          <div className="w-full h-52 rounded-2xl" style={{ background: generateGradientCSS() }} />
        )}
      </div>
      <div className='flex gap-8'>
        <div className='flex-1/3 bg-base-100'>
          <h2 className="mb-4">Gradient Type</h2>
          <div className="btn-group w-full">
            <button onClick={() => setGradientType('linear')} className={`btn flex-1 border-none font-semibold ${gradientType === 'linear' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-base-content shadow-lg' : 'bg-white/20 text-base-content'}`}>Linear</button>
            <button onClick={() => setGradientType('radial')} className={`btn flex-1 border-none font-semibold ${gradientType === 'radial' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-base-content shadow-lg' : 'bg-white/20 text-base-content'}`}>Radial</button>
            <button onClick={() => setGradientType('mesh')} className={`btn flex-1 border-none font-semibold ${gradientType === 'mesh' ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-base-content shadow-lg' : 'bg-white/20 text-base-content'}`}>Mesh</button>
          </div>

      <div className="flex flex-col gap-6 mb-6 mt-4">
          <div className={`${gradientType === 'linear' ? '' : 'lg:col-span-2'}`}>
              <div>
                <h2 className=" mb-4">Color Picker</h2>
                <div className="grid md:grid-cols-1 gap-4">
                  <input type="color" value={currentColor} onChange={(e) => gradientType === 'mesh' ? updateMeshColor(selectedMeshPoint, e.target.value) : updateColor(selectedStop, e.target.value)} className="w-full h-36 rounded-xl cursor-pointer overflow-hidden" />
                  <div className="space-y-3">
                    <div className="form-control">
                      <label className="label"><span className="label-text font-bold">HEX</span></label>
                      <input type="text" value={currentColor} onChange={(e) => gradientType === 'mesh' ? updateMeshColor(selectedMeshPoint, e.target.value) : updateColor(selectedStop, e.target.value)} className="input input-primary" />
                    </div>
                    <div className="grid grid-cols-3 gap-3">
                      <div className="form-control"><label className="label py-1"><span className="label-text text-base-content">R</span></label><input type="number" value={rgb.r} readOnly className="input input-sm bg-white/10 text-base-content" /></div>
                      <div className="form-control"><label className="label py-1"><span className="label-text text-base-content">G</span></label><input type="number" value={rgb.g} readOnly className="input input-sm bg-white/10 text-base-content" /></div>
                      <div className="form-control"><label className="label py-1"><span className="label-text text-base-content">B</span></label><input type="number" value={rgb.b} readOnly className="input input-sm bg-white/10 text-base-content" /></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className='flex-2/3 bg-base-100'>
        {gradientType === 'linear' && (
          <div className="form-control bg-white/5 p-4 rounded-xl mb-4">
            <label className="label w-24"><span className="label-text font-bold">Angle</span><span className="label-text font-bold text-2xl">{angle}°</span></label>
            &nbsp;&nbsp;
            <input type="range" min="0" max="360" value={angle} onChange={(e) => setAngle(Number(e.target.value))} className="range range-primary" />
          </div>
        )}
          {gradientType !== 'mesh' ? (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="card-title text-base-content">Color Stops</h2>
              <button onClick={addColorStop} className="btn bg-gradient-to-r from-green-500 to-emerald-600 border-none text-base-content shadow-lg gap-2">
                + Add Stop
              </button>
            </div>
            <div className="relative mb-8 p-2">
              <div ref={sliderRef} className="relative h-4 rounded-xl" style={{ background: generateGradientCSS() }}>
                {colorStops.map((stop) => (
                  <div key={stop.id} className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 cursor-grab" style={{ left: `${stop.position}%` }} onMouseDown={(e) => handleSliderMouseDown(stop.id, e)}>
                    <div className={`w-2 h-5 rounded-xl ${selectedStop === stop.id ? 'ring-2 ring-purple-400' : 'ring-2'}`} style={{ backgroundColor: stop.color }} />
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-3">
              {colorStops.map((stop) => (
                <div key={stop.id} className={`flex items-center gap-3 py-1 px-3 rounded-lg ${selectedStop === stop.id ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 ring-1 ring-purple-400/50' : 'bg-white/5'}`}>
                  <div className="w-8 h-8 rounded-lg cursor-pointer ring-2 ring-white/30" style={{ backgroundColor: stop.color }} onClick={() => setSelectedStop(stop.id)} />
                  <input type="text" value={stop.color} onChange={(e) => updateColor(stop.id, e.target.value)} className="input bg-white/20 border-white/30 text-base-content flex-1" />
                  <input type="number" value={stop.position} onChange={(e) => updatePosition(stop.id, Number(e.target.value))} className="input bg-white/20 border-white/30 text-base-content w-20 text-center font-bold" />
                  <span className="font-bold text-base-content">%</span>
                  {colorStops.length > 2 && (
                    <button onClick={() => deleteColorStop(stop.id)} className="btn btn-sm bg-gradient-to-r from-red-500 to-pink-600 border-none text-base-content">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
        </div>
      ) : (
        <div className="mb-6">
            <div className="flex justify-between items-center mb-6">
              <h2 className="card-title text-base-content">Mesh Points</h2>
              <button onClick={addMeshPoint} className="btn bg-gradient-to-r from-green-500 to-emerald-600 border-none text-base-content shadow-lg gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" /></svg>
                Add Point
              </button>
            </div>
            <div className="space-y-3">
              {meshPoints.map((point) => (
                <div key={point.id} className={`flex items-center gap-3 px-3 py-1.5 rounded-lg ${selectedMeshPoint === point.id ? 'bg-gradient-to-r from-purple-500/30 to-pink-500/30 ring-2 ring-purple-400/50' : 'bg-white/5'}`}>
                  <div className="w-8 h-8 rounded-lg cursor-pointer ring-2" style={{ backgroundColor: point.color }} onClick={() => setSelectedMeshPoint(point.id)} />
                  <input type="text" value={point.color} onChange={(e) => updateMeshColor(point.id, e.target.value)} className="input bg-white/20 border-white/30 text-base-content flex-1 font-mono" />
                  <input type="number" value={point.x} onChange={(e) => updateMeshPosition(point.id, Number(e.target.value), point.y)} className="input bg-white/20 border-white/30 text-base-content w-20 text-center" placeholder="X%" />
                  <input type="number" value={point.y} onChange={(e) => updateMeshPosition(point.id, point.x, Number(e.target.value))} className="input bg-white/20 border-white/30 text-base-content w-20 text-center" placeholder="Y%" />
                  {meshPoints.length > 2 && (
                    <button onClick={() => deleteMeshPoint(point.id)} className="btn btn-sm bg-gradient-to-r from-red-500 to-pink-600 border-none text-base-content">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                  )}
                </div>
              ))}
            </div>
        </div>
      )}
        </div>
      </div>

      <div className='flex justify-between mb-3'>
        <h2 className="card-title text-base-content">CSS Code</h2>
        <button onClick={copyToClipboard} className={`btn border-none text-base-content shadow-lg gap-2 ${copied ? 'bg-gradient-to-r from-green-500 to-emerald-600' : 'bg-gradient-to-r from-indigo-600 to-purple-600'}`}>
          {copied ? (
            <><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>Copied!</>
          ) : (
            <><svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg>Copy</>
          )}
        </button>
      </div>
      <pre className="bg-gray-900/80 text-emerald-300 p-6 rounded-xl overflow-x-auto border-2 border-emerald-500/30"><code>background: {generateGradientCSS()};</code></pre>
      <br /><br />
    </div>
  );
};

export default GradientMaker;