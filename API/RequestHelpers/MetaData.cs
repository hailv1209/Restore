using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace API.RequestHelpers
{
    public class MetaData
    {
        public int CurrentPage { get; set; }

        public int TotalPages { get; set; }

        public int PageSizes { get; set; }

        public int TotalCount { get; set; }
    }
}