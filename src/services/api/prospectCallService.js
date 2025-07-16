import mockData from "@/services/mockData/prospectCalls.json";

const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const prospectCallService = {
  async getAll() {
    await delay(300);
    return [...mockData];
  },

  async getById(id) {
    await delay(200);
    const call = mockData.find(call => call.Id === id);
    if (!call) {
      throw new Error("Call not found");
    }
    return { ...call };
  },

  async create(callData) {
    await delay(400);
    const newCall = {
      ...callData,
      Id: Math.max(...mockData.map(c => c.Id)) + 1
    };
    mockData.push(newCall);
    return { ...newCall };
  },

  async update(id, updateData) {
    await delay(300);
    const index = mockData.findIndex(call => call.Id === id);
    if (index === -1) {
      throw new Error("Call not found");
    }
    mockData[index] = { ...mockData[index], ...updateData };
    return { ...mockData[index] };
  },

  async delete(id) {
    await delay(250);
    const index = mockData.findIndex(call => call.Id === id);
    if (index === -1) {
      throw new Error("Call not found");
    }
    mockData.splice(index, 1);
    return { success: true };
  }
};