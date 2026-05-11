
"use client"
                      
import Grid from '@mui/material/Grid'
import CurrentPlan from './CurrentPlan'
import InvoiceListTable from './InvoiceListTable'
                      
  const BillingPlans = () => {


  return (
    <Grid container spacing={6}>
      <Grid item xs={12}>
        <CurrentPlan />
      </Grid>
      <Grid item xs={12}>
        <InvoiceListTable />
      </Grid>
    </Grid>
  )
}

export default BillingPlans
