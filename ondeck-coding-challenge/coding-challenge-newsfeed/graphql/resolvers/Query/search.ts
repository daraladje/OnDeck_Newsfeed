import db from '../../db';

type Args = {
  where: string;
};
export default async function search(
  parent: unknown,
  { where }: Args
): Promise<any[]> {
  if (where.length > 0) {
    const searchResults: any[] = await db.getAll(
      ` 
        SELECT id, name, bio, avatar_url, fellowship, Null as description, Null as icon_url, Null as title, Null as body from users WHERE name LIKE ?
        UNION
        SELECT id, name, Null as bio, Null as avatar_url, Null as fellowship, description, icon_url, Null as title, Null as body from projects WHERE name LIKE ?
        UNION
        SELECT id, Null as name, Null as bio, Null as avatar_url, fellowship, Null as description, Null as icon_url, title, body from announcements WHERE title LIKE ?
        `,
      ['%' + where + '%', '%' + where + '%', '%' + where + '%']
    );
    return searchResults;
  }
  return [];
}
