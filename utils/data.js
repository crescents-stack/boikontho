
const columns = [
  {name: "NAME", uid: "name"},
  {name: "ROLE", uid: "role"},
  {name: "STATUS", uid: "status"},
  {name: "ACTIONS", uid: "actions"},
];

const users = [
  {
    id: 1,
    name: "Tony Reichert",
    role: "CEO",
    team: "Management",
    status: "active",
    age: "29",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026024d",
    email: "tony.reichert@example.com",
  },
  {
    id: 2,
    name: "Zoey Lang",
    role: "Technical Lead",
    team: "Development",
    status: "paused",
    age: "25",
    avatar: "https://i.pravatar.cc/150?u=a042581f4e29026704d",
    email: "zoey.lang@example.com",
  },
  {
    id: 3,
    name: "Jane Fisher",
    role: "Senior Developer",
    team: "Development",
    status: "active",
    age: "22",
    avatar: "https://i.pravatar.cc/150?u=a04258114e29026702d",
    email: "jane.fisher@example.com",
  },
  {
    id: 4,
    name: "William Howard",
    role: "Community Manager",
    team: "Marketing",
    status: "vacation",
    age: "28",
    avatar: "https://i.pravatar.cc/150?u=a048581f4e29026701d",
    email: "william.howard@example.com",
  },
  {
    id: 5,
    name: "Kristen Copper",
    role: "Sales Manager",
    team: "Sales",
    status: "active",
    age: "24",
    avatar: "https://i.pravatar.cc/150?u=a092581d4ef9026700d",
    email: "kristen.cooper@example.com",
  },
];

const BookList = [
  {
    id: 0,
    image: "/Answer_to_an_Enemy_of_Islam_2.jpg",
    title: "Answer to an Enemy of Islam",
    price: 450,
  },
  {
    id: 1,
    image: "/Documents_of_the_Right_Word_2.jpg",
    title: "Documents of the Right Word 2",
    price: 500,
  },
  {
    id: 2,
    image: "/Endless_Bliss_Sixth_Fascicle.jpg",
    title: "Endless Bliss Sixth Fascicle",
    price: 250,
  },
  {
    id: 3,
    image: "/Endless_Bliss_Third_Fascicle_2.jpg",
    title: "Endless Bliss Third Fascicle 2",
    price: 350,
  },
]

export {columns, users, BookList};
