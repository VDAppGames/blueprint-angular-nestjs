import { from } from 'rxjs';
import { map } from 'rxjs/operators';
import { defaults, Pool, QueryArrayResult } from 'pg';
defaults.ssl = true;
const pool = new Pool();

// Renvoyer uniquement les informations nécessaires lors d'un appel 
export const query = (text, params = null) => {
    const queryObservable = from(pool.query(text, params));
    return queryObservable.pipe(
        map(
          (data: QueryArrayResult<any[]>) => data.command == 'INSERT' || data.command == 'DELETE' ? data.rowCount : data.rows
        )
      );
};