import { useContext } from 'react';
import { AuthContext } from '../../hooks/AuthContext';
import CustomButton from '../../assets/buttom/buttom';
import { useForm } from 'react-hook-form';
import './style.css';
import { Link } from 'react-router-dom';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';

function CadastroPage() {
    const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm();
    const { cadastro } = useContext(AuthContext);

    const handleSignupSubmit = (data) => {
        const { nome, email, senha } = data;
        cadastro(nome, email, senha);
    };

    return (
        <div>
            <div className="container">
                <form className="form-screen" onSubmit={handleSubmit(handleSignupSubmit)}>
                    <Link to="/login"><KeyboardBackspaceIcon className="icon-return" sx={{ fontSize: 50 }}/></Link>
                    <h3 className="title-register">Registre-se para acessar a plataforma</h3>
                    <div>
                        <label>Nome</label>
                        <input type="text"
                            className="input-forms"
                            placeholder="Digite seu nome completo"
                            {...register("nome", { required: true, minLength: 5, maxLength: 50 })}></input>
                        {errors.nome && errors.nome.type === "required" && isSubmitted && (<p className="error-message">Campo obrigatório.</p>)}
                        {errors.nome && errors.nome.type === "maxLength" && isSubmitted && (<p className="error-message">O nome não pode ter mais de 50 caracteres.</p>)}
                        {errors.nome && errors.nome.type === "minLength" && isSubmitted && (<p className="error-message">Por favor, verifique seus dados.</p>)}
                    </div>
                    <div>
                        <label>Email</label>
                        <input type="text"
                            className="input-forms"
                            placeholder="Digite seu email"
                            {...register("email", { required: true, maxLength: 64, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}></input>
                        {errors.email && errors.email.type === "required" && isSubmitted && (<p className="error-message">Campo obrigatório.</p>)}
                        {errors.email && errors.email.type === "maxLength" && isSubmitted && (<p className="error-message">O email não pode ter mais de 64 caracteres.</p>)}
                        {errors.email && errors.email.type === "pattern" && isSubmitted && (<p className="error-message">Por favor, insira um email válido.</p>)}
                    </div>
                    <div>
                        <label>Senha</label>
                        <input type="password"
                            className="input-forms"
                            placeholder="Digite uma senha"
                            {...register("senha", { required: true, maxLength: 8 })}></input>
                        {errors.senha && errors.senha.type === "required" && isSubmitted && (<p className="error-message">Campo obrigatório.</p>)}
                        {errors.senha && errors.senha.type === "maxLength" && isSubmitted && (<p className="error-message">A senha não pode ter mais de 8 caracteres.</p>)}
                    </div>
                    <div className="align-buttom">
                        <CustomButton type="submit" buttonText="Salvar" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CadastroPage;