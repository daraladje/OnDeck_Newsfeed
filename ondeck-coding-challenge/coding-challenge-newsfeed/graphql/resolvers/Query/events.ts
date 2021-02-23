import db from '../../db';

type Args = {
  filter: string;
  limit: number;
  offset: number;
};
// Returns relevant events for each fellowship, ordered by date created
export default async function events(
  parent: unknown,
  { filter, limit, offset }: Args
): Promise<any[]> {
  switch (filter) {
    case 'All':
      const allEvents: any[] = await db.getAll(
        ` 
        SELECT id, name, bio, avatar_url, fellowship, created_ts, updated_ts, Null as description, Null as icon_url, Null as title, Null as body from users
        UNION
        SELECT id, name, Null as bio, Null as avatar_url, Null as fellowship, created_ts, updated_ts, description, icon_url, Null as title, Null as body from projects
        UNION
        SELECT id, Null as name, Null as bio, Null as avatar_url, fellowship, created_ts, updated_ts, Null as description, Null as icon_url, title, body from announcements
        ORDER BY created_ts DESC
        LIMIT ?
        OFFSET ?
        `,
        [limit, offset]
      );
      return allEvents;
    case 'Founders':
      const founderEvents: any[] = await db.getAll(
        ` 
        SELECT id, name, bio, avatar_url, fellowship, created_ts, updated_ts, Null as description, Null as icon_url, Null as title, Null as body from users
        WHERE fellowship IN ("founders", "angels")
        UNION
        SELECT id, name, Null as bio, Null as avatar_url, Null as fellowship, created_ts, updated_ts, description, icon_url, Null as title, Null as body from projects
        UNION
        SELECT id, Null as name, Null as bio, Null as avatar_url, fellowship, created_ts, updated_ts, Null as description, Null as icon_url, title, body from announcements
        WHERE fellowship IN ("founders", "all")
        ORDER BY created_ts DESC
        LIMIT ?
        OFFSET ?
        `,
        [limit, offset]
      );
      return founderEvents;
    case 'Angels':
      const angelEvents: any[] = await db.getAll(
        ` 
        SELECT id, name, bio, avatar_url, fellowship, created_ts, updated_ts, Null as description, Null as icon_url, Null as title, Null as body from users
        WHERE fellowship IN ("founders", "angels")
        UNION
        SELECT id, name, Null as bio, Null as avatar_url, Null as fellowship, created_ts, updated_ts, description, icon_url, Null as title, Null as body from projects
        UNION
        SELECT id, Null as name, Null as bio, Null as avatar_url, fellowship, created_ts, updated_ts, Null as description, Null as icon_url, title, body from announcements
        WHERE fellowship IN ("angels", "all")
        ORDER BY created_ts DESC
        LIMIT ?
        OFFSET ?
        `,
        [limit, offset]
      );
      return angelEvents;
    case 'Writers':
      const writerEvents: any[] = await db.getAll(
        ` 
        SELECT id, name, bio, avatar_url, fellowship, created_ts, updated_ts, Null as description, Null as icon_url, Null as title, Null as body from users
        WHERE fellowship="writers"
        UNION
        SELECT id, Null as name, Null as bio, Null as avatar_url, fellowship, created_ts, updated_ts, Null as description, Null as icon_url, title, body from announcements
        WHERE fellowship IN ("writers", "all")
        ORDER BY created_ts DESC
        LIMIT ?
        OFFSET ?
        `,
        [limit, offset]
      );
      return writerEvents;
    default:
      return [];
  }
}
