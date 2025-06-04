// src/pages/SavedCandidates.tsx
import { useSavedCandidates } from '../hooks/useSavedCandidates';

const SavedCandidates = () => {
  const { savedCandidates, removeCandidate } = useSavedCandidates();

  return (
    <section>
      <h1>Saved Candidates</h1>
      {savedCandidates.length === 0 ? (
        <p>No candidates saved yet.</p>
      ) : (
        <table className="table">
          <thead>
            <tr>
              <th>Avatar</th>
              <th>Username</th>
              <th>GitHub</th>
              <th>Remove</th>
            </tr>
          </thead>
          <tbody>
            {savedCandidates.map(candidate => (
              <tr key={candidate.id}>
                <td>
                  <img src={candidate.avatar_url} alt={candidate.login} width={50} />
                </td>
                <td>{candidate.login}</td>
                <td>
                  <a href={candidate.html_url} target="_blank" rel="noreferrer">
                    Profile
                  </a>
                </td>
                <td>
                  <button onClick={() => removeCandidate(candidate.id)}>Remove</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </section>
  );
};

export default SavedCandidates;
