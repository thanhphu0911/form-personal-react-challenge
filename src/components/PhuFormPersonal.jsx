import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

function PhuFormPersonal() {
  const [users, setUsers] = useState([]);
  const [autoUsers, setAutoUsers] = useState([]);
  const [count, setCount] = useState(1);
  const [limit, setLimit] = useState(5);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({});

  function onDelete(userId) {
    setUsers((prevState) => prevState.filter((user) => user.id !== userId));
  }

  //fetch auto users
  useEffect(() => {
    async function fetchUsers() {
      const res = await fetch(
        `https://jsonplaceholder.typicode.com/users?_limit=${limit}&_page=${count}`
      );
      const data = await res.json();
      setAutoUsers(data);
    }
    fetchUsers();
  }, [limit, count]);
  // handle prev state

  function handlePrev() {
    if (count == 1) return;
    setCount((preState) => preState - 1);
  }

  // handle next state

  function handleNext() {
    setCount((preState) => preState + 1);
  }

  return (
    <div>
      <div className="mt-10 sm:mt-0">
        <div className="md:grid md:grid-cols-2 md:gap-6">
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form
              onSubmit={handleSubmit((data) => {
                // alert(JSON.stringify(data));
                console.log("data", data);
                const { first_name, last_name, email, country } = data;
                const user = {
                  id: Date.now(),
                  first_name,
                  last_name,
                  email,
                  country,
                };
                setUsers((prevState) => {
                  return [...prevState, user];
                });
              })}
            >
              <div className="shadow overflow-hidden sm:rounded-md">
                <div className="px-4 py-5 bg-white sm:p-6">
                  <div className="grid grid-cols-6 gap-6">
                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="first_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        First name
                      </label>
                      <input
                        type="text"
                        name="first_name"
                        id="first_name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        {...register("first_name", {
                          required: true,
                          minLength: 4,
                        })}
                      />
                      {errors.first_name && (
                        <p>Please input more than 4 chracters</p>
                      )}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="last_name"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Last name
                      </label>
                      <input
                        type="text"
                        name="last_name"
                        id="last_name"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        {...register("last_name")}
                      />
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="email"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Email address
                      </label>
                      <input
                        type="text"
                        name="email"
                        id="email"
                        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                        {...register("email", {
                          required: true,
                          minLength: {
                            value: 6,
                            message:
                              "This field must be more than 6 characters",
                          },
                          pattern: {
                            value:
                              /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                            message: `Email must have correct format!`,
                          },
                        })}
                      />
                      {errors?.email?.message}
                    </div>

                    <div className="col-span-6 sm:col-span-3">
                      <label
                        htmlFor="country"
                        className="block text-sm font-medium text-gray-700"
                      >
                        Country / Region
                      </label>
                      <select
                        id="country"
                        name="country"
                        className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                        {...register("country")}
                      >
                        <option value="US">United States</option>
                        <option value="Can">Canada</option>
                        <option value="Mex">Mexico</option>
                      </select>
                    </div>
                  </div>
                </div>
                <div className="px-4 py-3 bg-gray-50 text-right sm:px-6">
                  <button
                    type="submit"
                    className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    Save
                  </button>
                </div>
              </div>
            </form>
            <br />
          </div>
        </div>
      </div>

      <div className="relative overflow-x-auto">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                First Name
              </th>
              <th scope="col" className="px-6 py-3">
                Last Name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                Country
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0
              ? users.map((user) => {
                  return (
                    <tr
                      key={user.id}
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    >
                      <th
                        scope="row"
                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {user.first_name}
                      </th>
                      <td className="px-6 py-4">{user.last_name}</td>
                      <td className="px-6 py-4">{user.email}</td>
                      <td className="px-6 py-4">{user.country}</td>
                      <td className="px-6 py-4">
                        <button
                          type="button"
                          className="text-white bg-red-700 hover:bg-red-800 focus:outline-none focus:ring-4 focus:ring-red-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900"
                          onClick={() => onDelete(user.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })
              : autoUsers.map((autoUser) => (
                  <tr
                    key={autoUser.id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {autoUser.name}
                    </th>
                    <td className="px-6 py-4">{autoUser.username}</td>
                    <td className="px-6 py-4">{autoUser.email}</td>
                    <td className="px-6 py-4">{autoUser.address.city}</td>
                  </tr>
                ))}
          </tbody>

          <div className="max-w-sm flex justify-end items-center px-4 py-3 bg-gray-50 text-right sm:px-6">
            <div className="mr-1.5">Page: {count}</div>
            <button
              type="submit"
              className="inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handlePrev}
            >
              Prev
            </button>
            <button
              type="submit"
              className="mr-1.5 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={handleNext}
            >
              Next
            </button>
            <select
              onChange={(e) => setLimit(e.target.value)}
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            >
              <option value="5">5</option>
              <option value="10">10</option>
            </select>
          </div>
        </table>
      </div>
    </div>
  );
}

export default PhuFormPersonal;
