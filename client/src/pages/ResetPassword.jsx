import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ResetPassword() {
  const [resetToken, setResetToken] = useState('');
  const [valid, setValid] = useState(false);

  const p = useParams();
  p.token ? setResetToken(p.token) : setResetToken(null);

  useEffect();

  if (valid) {
    return (
      <div>
        <h2>Reset Password</h2>
        <form>
          <label>
            New Password:
            <input type='password' name='newPassword' required />
          </label>
          <button type='submit'>Reset Password</button>
        </form>
      </div>
    );
  }
  return <div>Invalid Token</div>;
}

export default ResetPassword;
