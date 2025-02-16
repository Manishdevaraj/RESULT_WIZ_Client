import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const ExaminationDetails = ({
  //  @ts-ignore 
  examinationTime,
  //  @ts-ignore 
  setExaminationTime,
  //  @ts-ignore 
  deptName,
  //  @ts-ignore 
  setDeptName,
  //  @ts-ignore 
  year,
  //  @ts-ignore 
  setYear,
  //  @ts-ignore 
  c,
  //  @ts-ignore 
  setC,
}) => {
  return (
    <div className="flex flex-col gap-6 p-6 max-w-3xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-bold">Update Examination Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Examination Time</label>
            <Input
              type="text"
              value={examinationTime}
              onChange={(e) => setExaminationTime(e.target.value)}
              placeholder="Enter examination time"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Department Name</label>
            <Input
              type="text"
              value={deptName}
              onChange={(e) => setDeptName(e.target.value)}
              placeholder="Enter department name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Year and Semester</label>
            <Input
              type="text"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              placeholder="Enter year and semester"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">College</label>
            <Input
              type="text"
              value={c}
              onChange={(e) => setC(e.target.value)}
              placeholder="Enter college details"
            />
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ExaminationDetails;
