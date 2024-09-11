import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

const DeleteAccount = () => {
  const [confirm, setConfirm] = useState(false);
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (confirm) {
      // 회원 탈퇴 logic
    }
  };

  return (
    <DeleteContainer>
      <h2>Delete Account</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="password"
          placeholder="Confirm Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <label>
          <input
            type="checkbox"
            checked={confirm}
            onChange={() => setConfirm(!confirm)}
          />
          Confirm Account Deletion
        </label>
        <button type="submit" disabled={!confirm}>
          Delete Account
        </button>
      </form>
    </DeleteContainer>
  );
};

const DeleteContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

export default DeleteAccount;
