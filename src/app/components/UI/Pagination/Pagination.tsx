import { useSpring, a } from 'react-spring';
import { PaletteType, TablePagination, colors } from '@material-ui/core';

import { usePrevious } from '../../../hooks';

interface PaginationProps {
  appearance: PaletteType;
  totalItems: number;
  currentPage: number;
  itemsPerPage: number;
  onPageChange: ( currentPage: number ) => void;
  onItemsPerPageChange: ( items: number ) => void;
}

const ITEMS_PER_PAGE_OPTIONS = [ 9, 12, 15, 18, 21 ];

export function Pagination( props: PaginationProps ) {
  const prevProps = usePrevious( props );
  const paginationAnim = useSpring({
    from: {
      transform: 'scale(0.8)',
      opacity: 0
    },
    to: {
      transform: 'scale(1)',
      opacity: 1
    },
    reset: true,
    immediate: props.appearance === prevProps?.appearance
  });

  return (
    <a.div style = { paginationAnim }>
      <TablePagination component = "div"
        style        = {{
          display: 'flex',
          justifyContent: 'center',
          backgroundColor: props.appearance === 'light' ? colors.grey[100] : colors.grey[600]
        }}
        labelRowsPerPage = "Photos per Page:"
        count        = { props.totalItems }
        page         = { props.currentPage }
        rowsPerPage  = { props.itemsPerPage }
        onPageChange = { ( e, page ) => props.onPageChange( page ) }
        rowsPerPageOptions = { ITEMS_PER_PAGE_OPTIONS }
        onRowsPerPageChange = { e => props.onItemsPerPageChange( +e.target.value ) } />
    </a.div>
  )
}
