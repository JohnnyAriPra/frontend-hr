export interface Actor{
    employee_id: number;
    first_name: string;
    last_name: string;
    email: string;
    phone_number: string;
    hire_date: string;
    job_id: string;
    salary: string;
    commission_pct: string; // Opcional si no siempre se incluye
    manager_id: number; // Opcional si no siempre se incluye
    department_id: number; // Opcional si no siempre se incluye
}