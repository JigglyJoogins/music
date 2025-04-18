import { useEffect, useState } from "react";
import { config } from '@site/src/components/component_config';
import styles from './styles.module.css';

export default function MusicList(): React.JSX.Element {
  const [data, setData] = useState(null);       // store fetched data
  const [loading, setLoading] = useState(true); // track loading state
  const [error, setError] = useState(null);     // handle errors
  
  useEffect(() => {
    fetch(`https://api.github.com/gists/${config.musicMetadataGistId}`)
    .then(res => {
      if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
      return res.json();
    })
    .then(json => JSON.parse(json.files['metadata.json'].content))
    .then(json => setData(json))
    .catch(err => setError(err.message))
    .finally(() => setLoading(false));
  }, []); // runs only once on load
  
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  
  return (
    <div>
      {data.files.map((entry) => (
        <div key={entry.id}>
          <p>{entry.name}</p>
          <iframe className={styles.music} src={`https://drive.google.com/file/d/${entry.id}/preview`}></iframe>
        </div>
      ))}
    </div>
  );
}