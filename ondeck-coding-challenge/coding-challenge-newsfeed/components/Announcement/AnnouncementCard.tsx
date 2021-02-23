import { getFellowshipPhoto } from '../../lib/announcementPhoto';
import Link from 'next/link';
import styled from 'styled-components';
import Card from '../Card';
import Markdown from '../Markdown';

type Props = {
  announcement: Announcement;
};

type Announcement = {
  id: number;
  fellowship: string;
  title: string;
  body: string;
};

export default function AnnouncementCard({ announcement }: Props) {
  const icon = getFellowshipPhoto(announcement && announcement.fellowship);
  return (
    <Card>
      <Columns>
        <ColumnLeft>
          <a href={'/announcements/' + announcement.id}>
            <Icon src={icon} />
          </a>
        </ColumnLeft>
        <ColumnRight>
          <h2>{announcement.title}</h2>
          <Markdown>{announcement.body}</Markdown>
        </ColumnRight>
      </Columns>
    </Card>
  );
}

const Icon = styled.img`
  background-color: rgba(0, 0, 0, 0.1);
  border-radius: 10px;
`;

const Columns = styled.div`
  display: flex;
  flex-direction: row;
  min-width: 21rem;
`;

const ColumnLeft = styled.div`
  display: flex;
  flex-direction: column;
  flex-basis: 7rem;
  flex-grow: 0;
  flex-shrink: 1;
  margin-right: 1.5rem;
`;

const ColumnRight = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 0;
  flex-basis: 14rem;
`;
