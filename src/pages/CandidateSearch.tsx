// src/pages/CandidateSearch.tsx
import { useState, useEffect } from 'react';
import { searchGithub } from '../api/API';
import { useSavedCandidates, Candidate } from '../hooks/useSavedCandidates';

const CandidateSearch = () => {
  const [users, setUsers] = useState<Candidate[]>([]);
  const { saveCandidate } = useSavedCandidates();

  useEffect(() => {
    const fetchUsers = async () => {
      const results = await searchGithub();
      setUsers(results);
    };
    fetchUsers();
  }, []);

  return (
    <section>
      <h1>Candidate Search</h1>
      <table className="table">
        <thead>
          <tr>
            <th>Avatar</th>
            <th>Username</th>
            <th>GitHub</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user => (
            <tr key={user.id}>
              <td>
                <img src={user.avatar_url} alt={user.login} width={50} />
              </td>
              <td>{user.login}</td>
              <td>
                <a href={user.html_url} target="_blank" rel="noreferrer">
                  View Profile
                </a>
              </td>
              <td>
                <button onClick={() => saveCandidate(user)}>Save</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default CandidateSearch;
