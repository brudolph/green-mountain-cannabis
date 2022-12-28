import { products, categories, vendors } from "./data";
import { Context } from ".keystone/types";

type CategoryProps = {
  name: string;
};

type VendorProps = {
  name: string;
};

type ProductProps = {
  name: string;
  slug: string;
  category: string;
  price: string;
  inventory: string;
  recreational: boolean;
  medical: boolean;
  hotDeal: boolean;
  topPick: boolean;
  status: string;
  vendor: string;
};

export async function insertSeedData(context: Context) {
  console.log(`� Inserting Seed Data: ${categories.length} Categories`);
  console.log(`� Inserting Seed Data: ${vendors.length} Vendors`);
  console.log(`� Inserting Seed Data: ${products.length} Products`);

  const createCategory = async (categoryData: CategoryProps) => {
    let category = await context.query.Category.findOne({
      where: { name: categoryData.name },
      query: "id",
    });

    if (!category) {
      category = await context.query.Category.createOne({
        data: categoryData,
        query: "id",
      });
    }
  };

  const createVendor = async (vendorData: VendorProps) => {
    let vendor = await context.query.Vendor.findOne({
      where: { name: vendorData.name },
      query: "id",
    });

    if (!vendor) {
      vendor = await context.query.Vendor.createOne({
        data: vendorData,
        query: "id",
      });
    }
  };

  const createProduct = async (productData: ProductProps) => {
    let categories = await context.query.Category.findMany({
      where: { name: { equals: productData.category } },
      query: "id",
    });
    console.log('categories', categories);

    let vendors = await context.query.Vendor.findMany({
      where: { name: { equals: productData.vendor } },
      query: "id",
    });
    console.log('vendors', vendors);

    await context.query.Product.createOne({
      data: { ...productData, category: { connect: { id: categories[0].id } }, vendor: { connect: { id: vendors[0].id } } },
      query: "id",
    });
  };

  // for (const category of categories) {
  //   console.log(`� Adding category: ${category.name}`);
  //   await createCategory(category);
  // }
  // for (const vendor of vendors) {
  //   console.log(`� Adding vendor: ${vendor.name}`);
  //   await createVendor(vendor);
  // }
  for (const product of products) {
    console.log(`� Adding product: ${product.name}`);
    await createProduct(product);
  }

  // for (const product of products) {
  //   console.log(`  �️ Adding Product: ${product.name}`);
  //   const { id: cid } = await prisma.category.create({
  //     data: { image: JSON.stringify(product.photo), altText: product.description },
  //   });
  //   // @ts-ignore
  //   delete product.photo;
  //   // @ts-ignore
  //   product.categoryId = cid;
  //   await prisma.product.create({ data: product });
  // }
  console.log(`✅ Seed Data Inserted: ${products.length} Products`);
  console.log(`� Please start the process with \`yarn dev\` or \`npm run dev\``);
  process.exit();
}
