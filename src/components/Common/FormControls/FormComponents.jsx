import requiredSign from './../../../requiredSign.png'
import styleForm from './FormComponents.module.css'

export const RequiredInput = ({input, meta}) => {
    return (
        <div className={styleForm.required}>
                <input {...input} placeholder={input.name} type={input.name} className={meta.error && meta.touched ? styleForm.required__input_error : styleForm.required__input} />
                {meta.error && meta.touched && <span><img className={styleForm.required__requiredSign} src={requiredSign} /></span>}
        </div>
    )
}