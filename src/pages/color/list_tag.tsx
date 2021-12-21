import clsx from 'clsx'

export const ListTag = (props: { list: string[]; selected?: string }) => (
  <>
    {props.list.map((item) => (
      <span
        className={clsx(
          'badge mx-1 d-inline-block',
          item + '' === props.selected
            ? 'bg-primary'
            : 'bg-secondary opacity-25'
        )}
        key={item}
      >
        {item}
      </span>
    ))}
  </>
)
