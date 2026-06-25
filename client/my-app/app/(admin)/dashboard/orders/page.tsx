"use client";

import React, { useState } from "react";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Button } from "@/components/ui/button";
import { Eye, Trash2 } from "lucide-react";

import { useDeleteOrdersMutation, useGetAllOrdersQuery } from "@/store/orderApi";
import { toast } from "sonner";
import ViewOrder from "@/components/admin/ViewOrder";


const Page = () => {
  const [open, setOpen] = useState(false);
  const [select, setSelect] = useState(null);
  const [deleteOrders] = useDeleteOrdersMutation()

  const { data, isLoading } = useGetAllOrdersQuery();


  if (isLoading) {
    return (
      <div className="p-6">
        Loading...
      </div>
    );
  }


  const orders = data?.orders || [];



  const handleView = (order: any) => {
    setOpen(true);
    setSelect(order)
  };


  const handleDelete = async (id: string) => {
    await deleteOrders({ id }).unwrap()
    toast.success("Order delete successFully")
  };



  return (

    <div className="p-6">


      <div className="mb-6">

        <h1 className="text-2xl font-bold">
          Orders
        </h1>

        <p className="text-gray-500">
          Manage all customer orders
        </p>

      </div>




      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                Product
              </TableHead>
              <TableHead>
                Order ID
              </TableHead>
              <TableHead>
                Customer
              </TableHead>


              <TableHead>
                Address
              </TableHead>


              <TableHead>
                Total
              </TableHead>


              <TableHead>
                Payment
              </TableHead>


              <TableHead>
                Status
              </TableHead>


              <TableHead>
                Date
              </TableHead>


              <TableHead className="text-right">
                Action
              </TableHead>


            </TableRow>


          </TableHeader>




          <TableBody>


            {
              orders.map((order: any) => (


                <TableRow key={order._id}>


                  <TableCell>


                    {
                      order.products.map((item: any) => (

                        <div
                          key={item._id}
                          className="flex items-center gap-3 mb-2"
                        >

                          <img
                            src={item.product.images[0]}
                            alt={item.product.name}
                            className="h-12 w-12 rounded object-cover"
                          />


                          <div>

                            <p className="font-medium">
                              {item.product.name}
                            </p>


                            <p className="text-sm text-gray-500">
                              Qty: {item.quantity}
                            </p>

                          </div>


                        </div>

                      ))
                    }


                  </TableCell>


                  <TableCell>

                    {order._id}

                  </TableCell>




                  <TableCell>

                    {order.shippingAddress.fullName}

                  </TableCell>




                  <TableCell>

                    <p>
                      {order.shippingAddress.address}
                    </p>

                    <p>
                      {order.shippingAddress.city},
                      {" "}
                      {order.shippingAddress.country}
                    </p>

                  </TableCell>





                  <TableCell>

                    ${order.totalPrice}

                  </TableCell>





                  <TableCell>


                    <span className="rounded bg-green-100 px-3 py-1 text-sm text-green-700">

                      {order.paymentStatus}

                    </span>


                  </TableCell>





                  <TableCell>


                    <span className="rounded bg-yellow-100 px-3 py-1 text-sm text-yellow-700">

                      {order.orderStatus}

                    </span>


                  </TableCell>





                  <TableCell>

                    {new Date(order.createdAt).toLocaleDateString()}

                  </TableCell>





                  <TableCell className="text-right">


                    <div className="flex justify-end gap-2">


                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleView(order)}
                      >

                        <Eye className="mr-2 h-4 w-4" />

                        View

                      </Button>





                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => handleDelete(order._id)}
                      >

                        <Trash2 className="mr-2 h-4 w-4" />

                        Delete

                      </Button>


                    </div>


                  </TableCell>




                </TableRow>


              ))
            }


          </TableBody>



        </Table>


      </div>


      <ViewOrder open={open} setOpen={setOpen} select={select} />
    </div>

  );

};


export default Page;