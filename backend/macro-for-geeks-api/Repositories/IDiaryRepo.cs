using System.Collections.Generic;
using System.Net.Http;
using System.Threading.Tasks;
using macro_for_geeks_api.Models;
using macro_for_geeks_api.ViewModels;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.ChangeTracking;

namespace macro_for_geeks_api.Repositories
{
    public interface IDiaryRepo
    {
        List<Diary> GetEntriesByUser(long id);
        
        Task<IEnumerable<Diary>> GetEntriesByDate(long id, string date);
        
        Task<IEnumerable<Diary>> GetEntriesByMeal(long id, string meal, string date);

        Task PostEntry(Diary diary);




        /*List<DiaryViewModel> */

    }
}