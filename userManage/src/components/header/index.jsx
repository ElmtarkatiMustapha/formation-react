import Button from "../button";

export default function Header() {
  return (
    <div className='header'>
      <div className="left">
        <h3>Welcome!</h3>
      </div>
      <div className="right">
        <Button label={'Disconnect'} color={'btn-danger'} name={'disconnect'} />
      </div>
    </div>
  )
}