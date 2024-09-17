import { useContext } from 'react';
import { AuthContext } from '../../hooks/AuthContext';
import CustomButton from '../../assets/buttom/buttom';
import { useForm } from 'react-hook-form';
import './style.css';
import { Link } from 'react-router-dom';

function LoginPage() {
    const { register, handleSubmit, formState: { errors, isSubmitted } } = useForm();
    const { login } = useContext(AuthContext);

    const handleLoginSubmit = async (data) => {
        const { email, senha } = data;
        await login(email, senha);
    };

    return (
        <div>
            <div className="container">
                <form className="login-screen" onSubmit={handleSubmit(handleLoginSubmit)}>
                    <h3 className="title-register">Faça seu login</h3>
                    
                    <div>
                        <label>Email</label>
                        <input 
                            type="text"
                            className="input-forms"
                            placeholder="Digite seu email"
                            {...register("email", { 
                                required: "Campo obrigatório.",
                                maxLength: { value: 100, message: "O email não pode ter mais de 100 caracteres." },
                                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Por favor, insira um email válido." }
                            })}
                        />
                        {errors.email && isSubmitted && (<p className="error-message">{errors.email.message}</p>)}
                    </div>
                    
                    <div>
                        <label>Senha</label>
                        <input 
                            type="password"
                            className="input-forms"
                            placeholder="Digite sua senha"
                            {...register("senha", { 
                                required: "Campo obrigatório.",
                                maxLength: { value: 8, message: "A senha não pode ter mais de 8 caracteres." }
                            })}
                        />
                        {errors.senha && isSubmitted && (<p className="error-message">{errors.senha.message}</p>)}
                    </div>
                    
                    <div className="space">
                        <Link to="/register" className="link-signup"><p>Não tem conta? Registre-se.</p></Link>
                    </div>
                    
                    <div>
                        <CustomButton type="submit" buttonText="Entrar" />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default LoginPage;