using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Entities;
using Microsoft.Extensions.Logging.Configuration;

namespace API.Extensions
{
    public static class ProductExtensions 
    {
        public static IQueryable<Product> Sort (this IQueryable<Product> query, string OrderBy) {

            if(string.IsNullOrWhiteSpace(OrderBy)) return query.OrderBy(p => p.Name);

            query = OrderBy switch {
                "price" => query.OrderBy(p => p.Price),
                "priceDesc" => query.OrderByDescending(p => p.Price),
                _ => query.OrderBy(p => p.Name)
            };

            return query;
        }

        public static IQueryable<Product> Search (this IQueryable<Product> query, string SearchTerm) {
            if(string.IsNullOrEmpty(SearchTerm)) return query ;

            var LowerCaseSearchterm = SearchTerm.Trim().ToLower();

            return query.Where(p => p.Name.ToLower().Contains(LowerCaseSearchterm));
        }

        public static IQueryable<Product> Filter (this IQueryable<Product> query, string brands, string types) {
                var brandList = new List<string>();
                var typeList = new List<string>();

                if(!string.IsNullOrEmpty(brands)) 
                    brandList.AddRange(brands.ToLower().Split(',').ToList());
                 if(!string.IsNullOrEmpty(types)) 
                    typeList.AddRange(types.ToLower().Split(',').ToList());

            query = query.Where(p => brandList.Count() == 0 || brandList.Contains(p.Brand.ToLower()));
            query = query.Where(p => typeList.Count() == 0 || typeList.Contains(p.Type.ToLower()));

            return query;
        }
    }
}