using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace API.RequestHelpers
{
    public class PageList <T> : List<T>
    {
        private List<TableBuilder> items;
        private int count;
        private int pageNumber;
        private int pageSize;

        public PageList(List<T> items, int count, int pageNumber, int pageSize)
        {
            MetaData = new MetaData 
            {
                TotalCount = count,
                PageSizes = pageSize,
                CurrentPage = pageNumber,
                TotalPages = (int)Math.Ceiling(count / (double)pageSize)
            };
            AddRange(items);
        }

        public PageList(List<TableBuilder> items, int count, int pageNumber, int pageSize)
        {
            this.items = items;
            this.count = count;
            this.pageNumber = pageNumber;
            this.pageSize = pageSize;
        }

        public MetaData MetaData { get; set; }

        public static async Task<PageList<T>> ToPagedList(IQueryable<T> query, 
        int pageNumber, int pageSize) 
        {
            var count = await query.CountAsync();
            var items = await query.Skip((pageNumber-1)*pageSize).Take(pageSize).ToListAsync();
            return new PageList<T>(items, count, pageNumber, pageSize);
        }
    }
}