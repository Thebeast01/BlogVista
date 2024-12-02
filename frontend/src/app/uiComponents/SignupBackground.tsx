'use client'

const SignupBackground = ({ children, backgroundURI }) => {
  return (
    <div className='relative min-h-screen flex items-center justify-center '>
      <div className="absolute inset-0 bg-cover bg-center z-0"
        style={{
          backgroundImage: `url(${backgroundURI})`,
          filter: 'brightness(0.5)'
        }}

      />
      <div className="absolute inset-0 z-10"
        style={{
          background: 'linear-gradient(50deg, #0f172a 50%, #e2e8f0 70%',
          mixBlendMode: 'multiply'

        }} />

      <div className="relative z-20 w-full max-w-lg p-8 lg:-translate-x-[300px] xl:-translate-x-[550px]">

        {children}
      </div>

    </div>
  )
}
export default SignupBackground;
