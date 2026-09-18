const fs = require('fs');
let content = fs.readFileSync('src/components/pdp/HeroBuyBox.jsx', 'utf8');

// 1. Simplify bundles array
content = content.replace(/const \[bundles, setBundles\] = useState\(\[\s*\{[^\]]*\]\);/g, `const [bundles, setBundles] = useState([
    { 
      id: 'tcore-1-bottle',
      name: "T-CORE", 
      title: "",
      mrp: 3000,
      price: 1499,
      subPrice: 1274,
      best: false,
      desc: ""
    }
  ]);`);

// 2. Remove "T-CORE " from heading
content = content.replace(/T-CORE Premium Masculine <br\/>/g, 'Premium Masculine <br/>');

// 3. Add Canvas imports
content = content.replace(/import \{ Check, Truck, ShieldCheck, RefreshCcw, Star, Plus, Minus, ArrowRight \} from 'lucide-react';/, `import { Check, Truck, ShieldCheck, RefreshCcw, Star, Plus, Minus, ArrowRight } from 'lucide-react';\nimport { Canvas } from '@react-three/fiber';\nimport { Environment } from '@react-three/drei';\nimport { EffectComposer, Bloom } from '@react-three/postprocessing';\nimport { ScienceProductModel } from '../science/ScienceProductModel';`);

// 4. Update the card to include 3D model
content = content.replace(/\{bundle\.name && \(\n\s*<div className="text-\[10px\] font-black uppercase tracking-widest text-\[#16C784\]">\n\s*\{bundle\.name\}\n\s*<\/div>\n\s*\)\}/, `<div className="absolute inset-0 z-0 opacity-100 pointer-events-none group-hover/spotlight:opacity-100 transition-opacity duration-700">\n                              <Canvas camera={{ position: [0, 0, 7], fov: 40 }} dpr={[1, 2]} gl={{ antialias: false, alpha: true }}>\n                                <React.Suspense fallback={null}>\n                                  <ambientLight intensity={1.5} />\n                                  <directionalLight position={[10, 10, 10]} intensity={2.0} />\n                                  <directionalLight position={[-10, 10, -10]} intensity={1.0} />\n                                  <Environment preset="city" />\n                                  <ScienceProductModel scale={[1, 1, 1]} position={[2.5, -0.8, 0]} />\n                                  <EffectComposer disableNormalPass>\n                                    <Bloom luminanceThreshold={0.5} mipmapBlur intensity={1.5} />\n                                  </EffectComposer>\n                                </React.Suspense>\n                              </Canvas>\n                            </div>\n\n                            <div className="relative z-10">\n                              {bundle.name && (\n                                <div className="text-[10px] font-black uppercase tracking-widest text-[#16C784]">\n                                  {bundle.name}\n                                </div>\n                              )}`);

// Need to match the inner card wrapper if the previous replace didn't work.
fs.writeFileSync('src/components/pdp/HeroBuyBox.jsx', content);
