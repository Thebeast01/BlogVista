'use client'
type Props = {
  children: React.ReactElement | React.ReactElement[];
  backgroundURI: string;
}
const SignupBackground: React.FC<Props> = ({ children, backgroundURI }) => {
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

      <div className="relative z-20 w-full max-w-2xl p-8 lg:-translate-x-[300px] xl:-translate-x-[500px]">

        {children}
      </div>

    </div>
  )
}
export default SignupBackground;
