/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex('Products').del()
  await knex('Products').insert([
    {
      product_id: 1, 
      title: 'DeviceyElite Computer and Phone set',
      description: 'Empower your ambitions with a dynamic duo optimized for entrepreneurial success. This blend caters to high-performance, connectivity-focused go-getters. The laptop empowers ideation and execution, while the smartphone serves as your command center, managing tasks, meetings, and competition.',
      product_image: 'http://localhost:8000/images/Laptop-Phone-set.jpg',
      price: 2899.00,
      star_rating: 5,
      quantity: 97},
    {
      product_id: 2,
      title: 'Laptoplair Laptop Bag',
      description: 'A blend of style and functionality for business success. Thoughtful compartments offer seamless transitions between workstations and events. Durable materials ensure reliability in the dynamic entrepreneurs lifestyle.',
      product_image: 'http://localhost:8000/images/LaptopBag.jpg',
      price: 20.00,
      star_rating: 4,
      quantity: 97,
    },
    {
      product_id: 3,
      title: 'Onyapack Portable Phone Charger',
      description: 'A potent compact charger fuels ambitions, keeping your digital venture charged in fast-paced entrepreneurship. Stay connected and in control with its high-capacity battery for back-to-back meetings, networking, and brainstorming.',
      product_image: 'http://localhost:8000/images/PortablePhoneCharger.jpg',
      price: 35.00,
      star_rating: 5,
      quantity: 98,
    },
    {
      product_id: 4,
      title: 'Endurobyte 1TB External Hard Drive',
      description: 'In business innovation, data management is vital. Get Endurobyte 1TB External Drive: dynamic, empowering entrepreneurs with ample storage. Sleek grey design, fast USB 3.0 for efficient, organized on-the-go business.',
      product_image: 'http://localhost:8000/images/ExternalHarddrive.jpg',
      price: 89.00,
      star_rating: 5,
      quantity: 97,
    },
    {
      product_id: 5,
      title: 'ArmorAudio Noise Cancelling Headphones',
      description: 'ArmorAudio Noise Cancelling Headphones: for focused entrepreneurs seeking style, productivity. Uninterrupted sound, comfort for brainstorming. Creative clarity in busy workspaces, always on the go.',
      product_image: 'http://localhost:8000/images/Noise-Cancelling-Headphones.jpg',
      price: 79.00,
      star_rating: 4,
      quantity: 99,
    },
    {
      product_id: 6,
      title: 'IvoryMarker Whiteboard',
      description: 'Empower vision, elevate business acumen with our dynamic whiteboard. Map ideas, devise strategies, foster innovation. Dive into creativity, brainstorm breakthroughs, turn concepts into plans, achieve goals.',
      product_image: 'http://localhost:8000/images/Whiteboard.jpg',
      price: 56.00,
      star_rating: 5,
      quantity: 97,
    },
    {
      product_id: 7,
      title: 'IlumiVue Blue Light Glasses',
      description: 'Shield against digital eye strain. Sleek design enhances professional image, reflects holistic well-being. Your secret weapon for focus during market research, website work. Allows for sustained focus and optimal performance.',
      product_image: 'http://localhost:8000/images/BluelightGlasses.jpg',
      price: 15.00,
      star_rating: 4,
      quantity: 97,
    }
  ]);
};
