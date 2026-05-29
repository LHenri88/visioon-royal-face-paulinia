import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { CLINIC } from './clinic.config';
import Nav from './components/Nav';
import Hero from './components/Hero';
import Differentials from './components/Differentials';
import Procedures from './components/Procedures';
import Numbers from './components/Numbers';
import Doctor from './components/Doctor';
import History from './components/History';
import Protocol from './components/Protocol';
import Simulator from './components/Simulator';
import BeforeAfter from './components/BeforeAfter';
import Testimonials from './components/Testimonials';
import Press from './components/Press';
import Awards from './components/Awards';
import Units from './components/Units';
import Facilities from './components/Facilities';
import Combos from './components/Combos';
import Financing from './components/Financing';
import Education from './components/Education';
import Partners from './components/Partners';
import Pricing from './components/Pricing';
import BestSellers from './components/BestSellers';
import Signature from './components/Signature';
import Results from './components/Results';
import Visit from './components/Visit';
import Schedule from './components/Schedule';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ChatWidget from './components/ChatWidget';

gsap.registerPlugin(ScrollTrigger);

const COMPONENTS: Record<string, React.ComponentType> = {
  Hero, Differentials, Procedures, Numbers, Doctor, History, Protocol,
  Simulator, BeforeAfter, Testimonials, Press, Awards, Units, Facilities,
  Combos, Financing, Education, Partners, Pricing, BestSellers, Signature,
  Results, Visit, Schedule, FAQ, Footer,
};

export default function App() {
  useEffect(() => {
    const lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) });
    function raf(time: number) { lenis.raf(time); requestAnimationFrame(raf); }
    requestAnimationFrame(raf);
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((time) => lenis.raf(time * 1000));
    gsap.ticker.lagSmoothing(0);

    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && e.target.classList.add('in')),
      { threshold: 0.12, rootMargin: '0px 0px -60px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el));
    return () => { lenis.destroy(); io.disconnect(); };
  }, []);

  return (
    <div className="min-h-screen">
      <Nav />
      {CLINIC.sections.map((name) => {
        const C = COMPONENTS[name];
        if (!C) return null;
        return <C key={name} />;
      })}
      <ChatWidget />
    </div>
  );
}
