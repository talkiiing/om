export interface ActionCardProps {
  title: JSX.Element | string
  content?: JSX.Element | string
  onClick?: CallableFunction
  action?: JSX.Element | string
}

const ActionCard = (props: ActionCardProps) => {
  return (
    <div className="flex flex-row text-text-default rounded-xl overflow-x-hidden">
      <div className="bg-background-surface px-4 py-3 space-y-2 flex-grow">
        <div className="text-xl text-text-highlight">{props.title}</div>
        {props.content ? (
          <div className="text-xs text-text-default">{props.content}</div>
        ) : null}
      </div>
      {props.action && (
        <div
          className={`cursor-pointer p-3 min-w-[5rem] flex justify-center 
items-center bg-background-surface-lighter hover:bg-background-surface-light 
transition-colors duration-200 cursor-pointer select-none`}
          onClick={() => props.onClick && props.onClick()}
        >
          {props.action}
        </div>
      )}
    </div>
  )
}

export default ActionCard
