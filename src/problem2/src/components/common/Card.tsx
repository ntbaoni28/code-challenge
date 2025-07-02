interface CardProps {
  children: React.ReactNode;
}
const Card = ({ children }: CardProps) => {
  return (
    <div className="w-full bg-background-200 rounded-lg px-3 py-4 lg:py-5 lg:px-6 lg:rounded-xl">
      {children}
    </div>
  );
};

export default Card;
