import { InputProps } from './typeShare';

const InputCustome = (props: InputProps) => {
    const { Title, onChange, Id, AutoComplete, Error, Type, style, Value } = props;
    return (
        <>
            <div className={style ? style : 'mb-3'}>
                <label className="form-label" htmlFor={Id}>
                    {Title}
                </label>
                <input
                    className="form-control"
                    value={Value}
                    autoComplete={AutoComplete}
                    id={Id}
                    type={Type}
                    onChange={onChange}
                />
                {Error ? <label className="bg text-danger">{Error}</label> : ''}
            </div>
        </>
    );
};
export default InputCustome;
