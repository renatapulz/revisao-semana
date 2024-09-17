import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useEditUser } from '../../hooks/UseEditUser';
import useFetchUser from '../../hooks/UseFetchUser';
import CustomButton from '../../assets/buttom/buttom';
import './style.css';
import { useParams } from 'react-router-dom';

function EditarUsuarioPage() {
  const { id } = useParams();

  const { userData, loading, error: fetchError } = useFetchUser(id);

  const { register, handleSubmit, formState: { errors, isSubmitted }, setValue } = useForm();
  const { editUser, isLoading: isEditing, error: editError } = useEditUser();

  useEffect(() => {
    if (userData) {
      setValue('nome', userData.nome);
      setValue('email', userData.email);
      setValue('senha', '');
    }
  }, [userData, setValue]);

  const handleEditSubmit = async (data) => {
    try {
      await editUser(id, data);
      alert('Usuário atualizado com sucesso');
    } catch (error) {
      alert('Erro ao atualizar o usuário');
    }
  };

  if (loading) return <p>Carregando dados do usuário...</p>;
  if (fetchError) return <p>{fetchError}</p>;

  return (
    <div>
      <div className="container">
        <form className="form-screen" onSubmit={handleSubmit(handleEditSubmit)}>
          <h3 className="title-register">Editar Usuário</h3>
          <div>
            <label>Nome</label>
            <input
              type="text"
              className="input-forms"
              placeholder="Digite seu nome completo"
              {...register("nome", { required: true, minLength: 5, maxLength: 50 })}
            />
            {errors.nome && errors.nome.type === "required" && isSubmitted && (<p className="error-message">Campo obrigatório.</p>)}
          </div>
          <div>
            <label>Email</label>
            <input
              type="text"
              className="input-forms"
              placeholder="Digite seu email"
              {...register("email", { required: true, maxLength: 64, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
            />
            {errors.email && errors.email.type === "required" && isSubmitted && (<p className="error-message">Campo obrigatório.</p>)}
          </div>
          <div>
            <label>Senha</label>
            <input
              type="password"
              className="input-forms"
              placeholder="Digite uma senha"
              {...register("senha", { required: false, maxLength: 8 })}
            />
          </div>
          <div className="align-buttom">
            <CustomButton type="submit" buttonText="Salvar" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarUsuarioPage;