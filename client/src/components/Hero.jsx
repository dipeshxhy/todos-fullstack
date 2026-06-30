import { Link } from 'react-router';

const Hero = () => {
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage: 'url(/hero.jpeg)',
        }}
      >
        <div className="hero-overlay"></div>
        <div className="hero-content text-neutral-content text-center">
          <div className="max-w-md">
            <h1 className="mb-5 text-5xl font-bold">
              Build Better days with <span className="text-warning">TaskManager</span>
            </h1>
            <p className="mb-5">
              Simplify your workflow, create better days that actually feel balanced and boost your
              productivity
            </p>
            <Link className="btn btn-success" to="/register">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Hero;
