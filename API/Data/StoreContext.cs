using API.Entities.ConfigAggregate;
using API.Entities.OrderAggregate;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace API.Data
{
    public class StoreContext : IdentityDbContext<User, Role, int>
    {
        public StoreContext(DbContextOptions options) : base(options)
        {

        }

        public DbSet<Product> Products { get; set; }
        public DbSet<Basket>  Baskets { get; set; }

        public DbSet<Order> Orders { get; set; }
        public DbSet<Config> Config { get; set; }
        public DbSet<ConfigPresetComposition> ConfigPresetCompositions { get; set; }

        public DbSet<Category> Categories { get; set; }
        public DbSet<ContactMessage> ContactMessages { get; set; }
        public DbSet<Producer> Producers { get; set; }
        public DbSet<ProductType> ProductTypes { get; set; }
        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);

            builder.Entity<User>()
            .HasOne(a => a.Address)
            .WithOne()
            .HasForeignKey<UserAddress>(a => a.Id)
            .OnDelete(DeleteBehavior.Cascade);

            builder.Entity<Role>()
            .HasData(
                new Role{Id = 1, Name = "Member", NormalizedName = "MEMBER"},
                new Role{Id = 2, Name = "Admin", NormalizedName = "ADMIN" },
                new Role{Id = 3, Name = "Test", NormalizedName = "TEST" }
            );
        }
    }
}