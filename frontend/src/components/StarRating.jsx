export default function StarRating({ value, setValue }) {
  return (
    <div className="flex gap-1">
      {[1,2,3,4,5].map(n => (
        <button key={n} type="button" onClick={() => setValue(n)} className={n <= value ? 'opacity-100' : 'opacity-40'}>
          ⭐
        </button>
      ))}
    </div>
  )
}
