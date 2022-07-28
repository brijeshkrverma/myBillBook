class ApiFilters{

    constructor(query, queryStr)
    {
       this.query=query;
       this.queryStr=queryStr;
    }

    search()
    {
      const keywords=this.queryStr.keywords ? 
      {
        locationTo:{
              $regex:this.queryStr.keywords,
              $options:'i'
          }
      } : {}
      this.query=this.query.find({...keywords});
      return this;
    }

    category(){
        const category=this.queryStr.category ? 
        {
            locationEnd:{
                $regex:this.queryStr.category,
                $options:'i'
            }
        } : {}
        this.query=this.query.find({...category})
        return this;
    }
}

module.exports = ApiFilters;