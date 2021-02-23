import db from '../../db';

type Args = {
  filter: string;
};
// Returns count of events to appear in feed of selected fellowship
export default async function count(
  parent: unknown,
  { filter }: Args
): Promise<Object> {
  switch (filter) {
    case 'All':
      const countAllEvents: any = await db.getOne(
        ` 
        SELECT
        (SELECT COUNT(*) from users)
        +
        (SELECT COUNT(*) from projects)
        +
        (SELECT COUNT(*) from announcements)
        `,
        []
      );
      return countAllEvents[Object.keys(countAllEvents)[0]];
    case 'Founders':
      const countFounderEvents: any = await db.getOne(
        ` 
        SELECT
        (SELECT COUNT(*) from users WHERE fellowship="founders" OR fellowship="angels")
        +
        (SELECT COUNT(*) from projects)
        +
        (SELECT COUNT(*) from announcements WHERE fellowship="founders" OR fellowship="all")
        `,
        []
      );
      return countFounderEvents[Object.keys(countFounderEvents)[0]];
    case 'Angels':
      const countAngelEvents: any = await db.getOne(
        ` 
        SELECT
        (SELECT COUNT(*) from users WHERE fellowship="founders" OR fellowship="angels")
        +
        (SELECT COUNT(*) from projects)
        +
        (SELECT COUNT(*) from announcements WHERE fellowship="angels" OR fellowship="all")
        `,
        []
      );
      return countAngelEvents[Object.keys(countAngelEvents)[0]];
    case 'Writers':
      const countWriterEvents: any = await db.getOne(
        ` 
        SELECT
        (SELECT COUNT(*) from users WHERE fellowship="writers")
        +
        (SELECT COUNT(*) from announcements WHERE fellowship="writers" OR fellowship="all")
        `,
        []
      );
      return countWriterEvents[Object.keys(countWriterEvents)[0]];
    default:
      return 0;
  }
}
