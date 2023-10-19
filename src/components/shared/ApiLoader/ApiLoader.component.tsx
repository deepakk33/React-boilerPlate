import { LoaderProps } from '@app/models/comman.model'

const ApiLoader = ({ type = 'linear' }: LoaderProps) => {
  return (
    <div className={' apiLoader hidden'}>
      <div className={'absolute z-[9] w-[100%]'}>
        {/* <ProgressBar type={type} /> */}
        <p>{type}loading</p>
      </div>
    </div>
  )
}

export { ApiLoader }
