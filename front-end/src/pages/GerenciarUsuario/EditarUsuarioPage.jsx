import { useEffect, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { useEditUser } from '../../hooks/UseEditUser';
import useFetchUser from '../../hooks/UseFetchUser';
import CustomButton from '../../assets/buttom/buttom';
import './style.css';
import { useParams, Link } from 'react-router-dom';
import { AuthContext } from '../../hooks/AuthContext';
import KeyboardBackspaceIcon from '@mui/icons-material/KeyboardBackspace';
import DeleteIcon from '@mui/icons-material/Delete';
import useDeleteUser from '../../hooks/UseDeleteUser';

function EditarUsuarioPage() {
  const { id } = useParams();
  const { userData, loading, error: fetchError } = useFetchUser(id);

  const { register, handleSubmit, formState: { errors, isSubmitted }, setValue } = useForm();
  const { editUser } = useEditUser();
  const { isAdmin, userId: loggedInUserId, logout } = useContext(AuthContext);
  const { deleteUser } = useDeleteUser();

  useEffect(() => {
    if (userData) {
      setValue('nome', userData.nome);
      setValue('email', userData.email);
      setValue('senha', '');
      setValue('permissao', userData.permissao || 'user');
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

  const handleDelete = async () => {
    if (window.confirm('Tem certeza que deseja excluir sua conta?')) {
      try {
        await deleteUser(id);
        logout();
      } catch (error) {
        alert('Erro ao excluir a conta.');
      }
    }
  };

  if (loading) return <p>Carregando dados do usuário...</p>;
  if (fetchError) return <p>{fetchError}</p>;
  const isCurrentUser = loggedInUserId === parseInt(id);

  return (
    <div>
      <div className="container">
        <form className="form-screen" onSubmit={handleSubmit(handleEditSubmit)}>
          {isAdmin && (
            <div>
              <Link to="/users"><KeyboardBackspaceIcon className="icon-return" sx={{ fontSize: 50 }}/></Link>
            </div>
          )}
          <div className='title-icon'>
            <h3 className="title-register">Editar Usuário</h3>
            {isCurrentUser && (
              <DeleteIcon sx={{ fontSize: 30 }} className="icon-card-delete" onClick={handleDelete} />
            )}
          </div>
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
          {isAdmin && (
            <div>
              <label>Permissão</label>
              <select className='select-permission' {...register("permissao")}>
                <option value="user">Usuário padrão</option>
                <option value="admin">Administrador</option>
              </select>
            </div>
          )}
          <div className="align-buttom">
            <CustomButton type="submit" buttonText="Salvar" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditarUsuarioPage;