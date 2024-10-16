import InteractiveMap from '@/components/InteractiveMap';
import ImageProcessor from '@/components/ImageProcessor';
import { CoordinatesProvider } from '@/contexts/CoordinatesContext';

export default function Home() {
  return (
    <CoordinatesProvider>
      <main className="flex min-h-screen flex-col items-center justify-between p-24">
        <h1 className="text-4xl font-bold mb-8">Interactive Map and Risk Calculator</h1>
        <InteractiveMap />
        <ImageProcessor />
      </main>
    </CoordinatesProvider>
  );
}