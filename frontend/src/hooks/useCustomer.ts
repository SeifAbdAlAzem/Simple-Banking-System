import { useEffect, useState } from "react";
import { fetchCustomers, fetchCustomerById } from "../services/apiService";
import { Customer } from "../types";

export const useCustomers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);
  useEffect(() => {
    fetchCustomers().then(setCustomers);
  }, []);
  return customers;
};

export const useCustomer = (id: string | undefined) => {
  const [customer, setCustomer] = useState<Customer | null>(null);
  useEffect(() => {
    if (id) {
      fetchCustomerById(id).then(setCustomer);
    }
  }, [id]);
  return customer;
};
