import { Box, Typography, Pagination } from "@mui/material";
import { MetaData } from "../models/pagination";


interface Props {
    metaData : MetaData ;
    onPagechange : (page : number) => void ;
    
}
export default function AppPagination ({metaData, onPagechange} : Props) {
    const {currentPage, totalCount, totalPages, pageSizes} = metaData;
    return (
        <Box display="flex" justifyContent="space-between" alignItems="center">
        <Typography>
            Displaying {(currentPage -1)*pageSizes +1}
             - {currentPage*pageSizes > totalCount 
             ? totalCount 
             : currentPage*pageSizes} of {totalCount} items
        </Typography>
        <Pagination 
            color="secondary" 
            size="large" 
            count={totalPages} 
            page={currentPage} 
            onChange={(e,page) => onPagechange(page)}
            />
      </Box>
    )
}