import { Card } from '@material-ui/core';
import styled from 'styled-components';
import AnnouncementCard from '../Announcement/AnnouncementCard';
import ProjectCard from '../Project/ProjectCard';
import UserCard from '../Users/UserCard';

export default function Feed({ events }) {
  return (
    <div>
      {(events && !!events.length && (
        <>
          {events.map((e) =>
            e.__typename == 'User' ? (
              <UserCard user={e} key={'user_' + e.id} />
            ) : e.__typename == 'Project' ? (
              <ProjectCard project={e} key={'project_' + e.id} />
            ) : e.__typename == 'Announcement' ? (
              <AnnouncementCard announcement={e} key={'announcement_' + e.id} />
            ) : null
          )}
        </>
      )) || (
        // To keep the look of the page consistent - probably a better way to do this via CSS styling
        <Card>
          <EmptyCard />
        </Card>
      )}
    </div>
  );
}

const EmptyCard = styled.div`
  width: 600px;
`;
