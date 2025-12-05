type GradientDividerProps = {
  style?: string;
};

export default function GradientDivider({ style }: GradientDividerProps) {
  return (
    <div className={`gradient-line border-2 border-b my-8 ${style}`}></div>
  );
}
