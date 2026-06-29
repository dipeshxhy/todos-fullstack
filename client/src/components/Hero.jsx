import { Link } from 'react-router';

const Hero = () => {
  return (
    <div>
      <div
        className="hero min-h-screen"
        style={{
          backgroundImage:
            'url(https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=900&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8dG9kb3xlbnwwfHwwfHx8MA%3D%3D)',
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
