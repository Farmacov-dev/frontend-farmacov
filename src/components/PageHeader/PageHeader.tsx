import { styled } from '@mui/material/styles';
  import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

  interface PageHeaderProps {
    title: string;
    description?: string;
    lastUpdated?: string;
  }

  const Wrapper = styled('div')({
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
  });

  const Title = styled('h1')({
    margin: 0,
    fontSize: '24px',
    fontWeight: 700,
    fontFamily: 'Inter, sans-serif',
    color: '#111827',
  });

  const Description = styled('p')({
    margin: 0,
    fontSize: '14px',
    fontWeight: 400,
    fontFamily: 'Inter, sans-serif',
    color: '#6B7280',
  });

  const DateRow = styled('div')({
    display: 'flex',
    alignItems: 'center',
    gap: '6px',
    fontSize: '13px',
    fontFamily: 'Inter, sans-serif',
    color: '#6B7280',
    marginTop: '4px',
  });

  const PageHeader = ({ title, description, lastUpdated }: PageHeaderProps) => (
    <Wrapper>
      <Title>{title}</Title>
      {description && <Description>{description}</Description>}
      {lastUpdated && (
        <DateRow>
          <CalendarTodayIcon sx={{ fontSize: '14px' }} />
          Última actualización: {lastUpdated}
        </DateRow>
      )}
    </Wrapper>
  );

  export default PageHeader;