interface StepsProps {
  total: number
  current: number
  onSelect?: (selectedNum: number) => void
  className?: string
}

interface StepProps {
  crossed: boolean
  current: boolean
  title: number
  last: boolean
  onClick?: CallableFunction
}

const Step = (props: StepProps) => {
  return (
    <>
      <div
        className={`${
          props.current ? 'ring-1 text-omblue' : 'ring-0 text-white'
        } ${
          props.onClick ? 'cursor-pointer' : 'cursor-default'
        } w-8 h-8 flex items-center justify-center bg-omsteps 
        ring-omblue rounded-full flex-shrink-0 select-none`}
        onClick={() => props.onClick?.()}
      >
        <span>{props.title + 1}</span>
      </div>
      {!props.last ? (
        <div
          className={`h-0 w-full border ${
            props.crossed ? 'border-omblue' : 'border-gray-700'
          }`}
        />
      ) : null}
    </>
  )
}

const Steps = (props: StepsProps) => {
  return (
    <div
      className={`${
        props.className || ''
      } h-10 flex items-center justify-between space-x-3`}
    >
      {Array.from({ length: props.total }, () => 0).map((v, i) => (
        <Step
          current={props.current === i}
          title={i}
          crossed={props.current > i}
          last={props.total - 1 === i}
          onClick={
            props.onSelect && props.current > i
              ? () => props.onSelect?.(i)
              : undefined
          }
        />
      ))}
    </div>
  )
}

export default Steps
